"use client";
import React, { useEffect, useState } from "react";
import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

moment.locale("ar-SA");
const localizer = momentLocalizer(moment);
const ReactBigCalender = ({ allReservations }: any) => {
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  console.log(allReservations);
  useEffect(() => {
    const events = allReservations.map((reservation: any) => ({
      id: reservation?.id,
      end: new Date(reservation?.endDate),
      start: new Date(reservation?.startDate),
      title: reservation?.listing?.title,
      status: reservation?.status,
      name: reservation?.name || reservation?.user?.name,
      phoneNumber: reservation?.phoneNumber || reservation?.user?.phoneNumber,
    }));
    // console.log(events);
    setEventsData(events);
  }, [allReservations]);

  //   const handleSelect = ({ start, end }: any) => {
  //     console.log(start);
  //     console.log(end);
  //     const title = window.prompt("New Event name");
  //     if (title)
  //       setEventsData([
  //         ...eventsData,
  //         {
  //           start,
  //           end,
  //           title,
  //         },
  //       ]);
  //   };
  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
  };

  const closeDialog = () => {
    setSelectedEvent(null);
  };
  return (
    <div className="w-full mt-10" dir="ltr">
      <Calendar
        selectable
        events={eventsData}
        defaultView="month"
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventSelect}
        style={{ height: 500 }}
        eventPropGetter={(allReservations: any) => {
          let backgroundColor = "";
          switch (allReservations?.status) {
            case "confirmed":
              backgroundColor = "green";
              break;
            case "pending":
              backgroundColor = "gray";
              break;
            case "canceled":
              backgroundColor = "red";
              break;
            default:
              backgroundColor = "";
          }
          return { style: { backgroundColor } };
        }}
        // onSelectSlot={handleSelect}
      />
      {selectedEvent && (
        <div className="max-sm:px-5">
          <Dialog open={Boolean(selectedEvent)} onOpenChange={closeDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  name: {selectedEvent.name}
                  <br />
                  phoneNumber: {selectedEvent.phoneNumber}
                  <br />
                  Start: {new Date(selectedEvent.start).toLocaleString()}
                  <br />
                  End: {new Date(selectedEvent.end).toLocaleString()}
                  <br />
                  Status: {selectedEvent.status}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeDialog}
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ReactBigCalender;
