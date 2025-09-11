import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToExcel(filename: string, rows: Record<string, any>[]) {
  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report')
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

export function exportToPDF(filename: string, headers: string[], rows: any[][]) {
  const doc = new jsPDF()
  autoTable(doc, { head: [headers], body: rows })
  doc.save(`${filename}.pdf`)
}


