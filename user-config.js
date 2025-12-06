const PRINTERIP = '192.168.1.31'
const USER = 'root'
const PASSWORD = 'creality_2024'


// Enter the slicer you want to sync from 
// 'orca' or 'creality'
const SLICER = 'creality'

/*
Users logged into the slicer will need to specify their unique user folder id
replace default below with the id from:

OrcaSlicer
    Mac: /Library/Application Support/OrcaSlicer/user/USERID#
    Linux: /.config/OrcaSlicerOrcaSlicer/user/USERID#
    Windows: /AppData/Roaming/OrcaSlicer/user/USERID#

CrealityPrint
    Mac: /Library/Application Support/Creality/Creality Print/6.0/user/USERID#
    Linux: /.config/Creality/Creality Print/6.0/user/USERID#
    Windows: /AppData/Roaming/Creality/Creality Print/6.0/user/USERID#

Not logged in: 'default'
*/
const USERID = '4395383826'

module.exports = {PRINTERIP, USER, PASSWORD, SLICER, USERID}