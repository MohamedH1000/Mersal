// components/admin/DataTable.tsx
import { FaPlus } from "react-icons/fa";

interface DataTableProps {
  title: string;
  columns: {
    header: string;
    accessor: string;
    render?: (value: any) => React.ReactNode;
  }[];
  data: any[];
  onAddClick?: () => void;
}

const DataTable = ({ title, columns, data, onAddClick }: DataTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{title}</h2>
          {onAddClick && (
            <button
              onClick={onAddClick}
              className="bg-[#bda069] text-white px-4 py-2 rounded hover:bg-[#a58c5e] flex items-center gap-2"
            >
              <FaPlus /> إضافة جديد
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 text-right font-medium text-gray-700"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b hover:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="py-3 px-4">
                        {column.render
                          ? column.render(row[column.accessor])
                          : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-6 text-center text-gray-500"
                  >
                    لا توجد بيانات متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {data.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              عرض 1 إلى {data.length} من {data.length} عناصر
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                disabled
              >
                السابق
              </button>
              <button
                className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                disabled
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
