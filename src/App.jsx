import { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [form, setForm] = useState({
    firstName: "Long",
    lastName: "Tran Hoang",
  });

  const onChange = (e) => {
    setForm((prev) => {
      const name = e.target.name;
      const value = e.target.value;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const exportPdf = async () => {
    const capture = document.querySelector("#capture");

    if (capture)
      html2canvas(capture, { scale: 5 }).then((canvas) => {
        const img = canvas.toDataURL("image/png");
        const wid = canvas.width;
        const hgt = canvas.height;
        const hratio = hgt / wid;
        const doc = new jsPDF("p", "px", "a4");
        const width = doc.internal.pageSize.width;
        const height = width * hratio;
        doc.addImage(img, "JPEG", 0, 0, width, height, "someAlias", "FAST");
        doc.save("invoice.pdf");
      });
  };

  return (
    <>
      <form className="w-1/2 m-auto mt-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={form?.firstName}
                    onChange={onChange}
                    autoComplete="given-name"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={form?.lastName}
                    onChange={onChange}
                    autoComplete="family-name"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => exportPdf()}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Download invoice
          </button>
        </div>
      </form>
      <div id="capture" className="w-1/2 m-auto">
        <section className="py-20">
          <div className="max-w-5xl mx-auto py-16 bg-white">
            <article className="overflow-hidden">
              <div className="bg-[white] rounded-b-md">
                <div className="p-9">
                  <div className="space-y-6 text-slate-700">
                    <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                      LOGO
                    </p>
                  </div>
                </div>
                <div className="p-9">
                  <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-12">
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Invoice Detail:
                        </p>
                        <p>
                          {form?.firstName} {form?.lastName}
                        </p>
                        <p>Fake Street 123</p>
                        <p>San Javier</p>
                        <p>CA 1234</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Billed To
                        </p>
                        <p>The Boring Company</p>
                        <p>Tesla Street 007</p>
                        <p>Frisco</p>
                        <p>CA 0000</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Invoice Number
                        </p>
                        <p>000000</p>

                        <p className="mt-2 text-sm font-normal text-slate-700">
                          Date of Issue
                        </p>
                        <p>00.00.00</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Terms
                        </p>
                        <p>0 Days</p>

                        <p className="mt-2 text-sm font-normal text-slate-700">
                          Due
                        </p>
                        <p>00.00.00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-9">
                  <div className="flex flex-col mx-0 mt-8">
                    <table className="min-w-full divide-y divide-slate-500">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                          >
                            Rate
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                            <div className="font-medium text-slate-700">
                              Tesla Truck
                            </div>
                            <div className="mt-0.5 text-slate-500 sm:hidden">
                              1 unit at $0.00
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            48
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            $0.00
                          </td>
                          <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            $0.00
                          </td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                            <div className="font-medium text-slate-700">
                              Tesla Charging Station
                            </div>
                            <div className="mt-0.5 text-slate-500 sm:hidden">
                              1 unit at $75.00
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            4
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            $0.00
                          </td>
                          <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            $0.00
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th
                            scope="row"
                            colSpan="3"
                            className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Subtotal
                          </th>
                          <th
                            scope="row"
                            className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                          >
                            Subtotal
                          </th>
                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            $0.00
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan="3"
                            className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Discount
                          </th>
                          <th
                            scope="row"
                            className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                          >
                            Discount
                          </th>
                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            $0.00
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan="3"
                            className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Tax
                          </th>
                          <th
                            scope="row"
                            className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                          >
                            Tax
                          </th>
                          <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            $0.00
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan="3"
                            className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                          >
                            Total
                          </th>
                          <th
                            scope="row"
                            className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                          >
                            Total
                          </th>
                          <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                            $0.00
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="mt-10 p-9">
                  <div className="border-t pt-9 border-slate-200">
                    <div className="text-sm font-light text-slate-700">
                      <p>Payment terms are 14 days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
