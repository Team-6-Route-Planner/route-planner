export default function changeDate(dateString){
  const date = new Date(dateString)
  let month = date.getMonth() + 1
  month = Number(month)
  switch (month) {
    case 1:
      month = 'Januari'
      break;
    case 2:
      month = 'Februari'
      break;
    case 3:
      month = 'Maret'
      break;
    case 4:
      month = 'April'
      break;
    case 5:
      month = 'Mei'
      break;
    case 6:
      month = 'Juni'
      break;
    case 7:
      month = 'Juli'
      break;
    case 8:
      month = 'Agustus'
      break;
    case 9:
      month = 'September'
      break;
    case 10:
      month = 'Oktober'
      break;
    case 11:
      month = 'November'
      break;
    case 12:
      month = 'Desember'
      break;
  }

  return date.getDate() + ' ' + month + ' ' + date.getFullYear()
}