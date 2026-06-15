'use client'

import { motion } from 'framer-motion'

export default function InvoicePage() {
  return (
    <body>
      <div className="min-h-screen bg-gray-50 font-[milk-honey]">
        {/* Invoice Content */}
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="invoice-content rounded-lg bg-white shadow-lg"
          >
            {/* Invoice Header */}
            <div className="p-8">
              {/* Bill To Section */}
              <div className="mb-8">
                <h3 className="mb-4 font-[milk-honey] text-lg font-semibold">
                  Bill To:
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="border-b pb-1 font-[milk-honey] text-xs font-semibold">
                      Panji Nur Rahman dan Gina Ghaisani
                    </p>
                  </div>
                </div>
              </div>

              {/* Pre Wedding Section */}
              <div className="mb-8">
                <div className="mb-4">
                  <h4 className="font-[milk-honey] text-xl font-bold text-gray-900">
                    Pre Wedding
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left font-[milk-honey] text-xs">
                          Description
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          Qty
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Price
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Total
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Film Ultramax 400
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Film Gold 200
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Cuci Foto
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          2
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Jasa Foto Lamar
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Jasa Foto Street
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Wedding Digital Section */}
              <div className="mb-8">
                <div className="mb-4">
                  <h4 className="font-[milk-honey] text-xl font-bold text-gray-900">
                    Wedding Digital
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left font-[milk-honey] text-xs">
                          Description
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          Qty
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Price
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Total
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Server
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Hosting/Domain
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 31,350
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 31,350
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          LUNAS
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Jasa Pembuatan Website
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Storage Google Cloud
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-[milk-honey] text-xs">
                          Aset Website
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-[milk-honey] text-xs font-semibold">
                          Rp. 0
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-[milk-honey] text-xs">
                          GRATIS
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between border-t-2 border-gray-400 py-2 font-[milk-honey] text-lg font-bold">
                    <span>Grand Total:</span>
                    <span>Rp. 0</span>
                  </div>
                </div>
              </div>

              {/* Notes and Terms */}
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h5 className="mb-2 font-[milk-honey] text-xs font-semibold">
                    Notes
                  </h5>
                  <div className="border-b pb-1 font-[milk-honey] text-xs font-light">
                    <p>Simpan aja uangnya buat keperluan yang lain</p>
                    <p>Anggep aja hadiah ges</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </body>
  )
}
