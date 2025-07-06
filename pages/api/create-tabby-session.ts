import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { totalPrice, email, phoneNumber, nameOfReserver } = req.body;

  try {
    const tapRes = await fetch("https://api.tap.company/v2/charges/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalPrice,
        currency: "SAR", // Change to your currency
        threeDSecure: true,
        save_card: false,
        description: "Reservation Payment",
        statement_descriptor: "Reservation Fee",
        metadata: {
          udf1: "Reservation",
          udf2: nameOfReserver,
        },
        reference: {
          transaction: `RES_${Date.now()}`,
          order: `ORDER_${Date.now()}`,
        },
        receipt: {
          email: true,
          sms: true,
        },
        customer: {
          first_name: nameOfReserver?.split(" ")[0] || nameOfReserver,
          last_name: nameOfReserver?.split(" ").slice(1).join(" ") || "",
          email: email,
          phone: {
            country_code: "966", // Saudi Arabia country code
            number: phoneNumber.replace(/^\+966/, "").replace(/\D/g, ""),
          },
        },
        // merchant: {
        //   id: process.env.TAP_MERCHANT_ID,
        // },
        source: {
          id: "src_all", // This allows all payment methods
        },
        redirect: {
          url: `${process.env.NEXT_PUBLIC_URL}/reservation-success`,
        },
        post: {
          url: `${process.env.NEXT_PUBLIC_URL}/api/tap-webhook`,
        },
      }),
    });

    // Check if response is JSON
    const contentType = tapRes.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await tapRes.text();
      throw new Error(`Tap API returned non-JSON response: ${textResponse}`);
    }

    const tapData = await tapRes.json();

    if (!tapRes.ok) {
      throw new Error(
        `Tap API error: ${tapRes.status} - ${JSON.stringify(tapData)}`
      );
    }

    // Tap returns the payment URL in the transaction.url field for charges
    if (!tapData.transaction?.url) {
      throw new Error(
        "Failed to create Tap charge: " + JSON.stringify(tapData)
      );
    }

    res.status(200).json({
      paymentUrl: tapData.transaction.url, // This is the checkout URL
      chargeId: tapData.id,
      reference: tapData.reference,
    });
  } catch (error: any) {
    console.error("Tap API error:", error.message);
    res.status(500).json({
      error: "Checkout creation failed",
      details: error.message,
    });
  }
}
