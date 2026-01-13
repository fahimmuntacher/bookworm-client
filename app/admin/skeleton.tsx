import React from "react";

const Loading = () => {
  const rows = 8;

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-t animate-pulse">
              <td className="px-4 py-3">
                <div className="w-10 h-14 bg-slate-200 rounded" />
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-40 bg-slate-200 rounded" />
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-32 bg-slate-200 rounded" />
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-16 bg-slate-200 rounded" />
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <div className="w-5 h-5 bg-slate-200 rounded" />
                  <div className="w-5 h-5 bg-slate-200 rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loading;
