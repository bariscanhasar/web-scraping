
const pool = require('../db')


async function insertCarDetails(data) {
    const motor_hacmi = isNaN(data.motor_hacmi) ? null : data.motor_hacmi;
    const motor_gucu = isNaN(data.motor_gucu) ? null : data.motor_gucu;
    const yakit_deposu = isNaN(data.yakit_deposu) ? null : data.yakit_deposu
    const query = `INSERT INTO cars (
        ilan_no,
        fiyat,
        ilan_tarihi,
        marka,
        seri,
        model,
        yil, 
        kilometre,
        vites_tipi,
        yakit_tipi,
        kasa_tipi,
        motor_hacmi,
        motor_gucu, 
        cekis, 
        yakit_tuketimi,
        yakit_deposu, 
        boya_degisen,
        takasa_uygun,
        kimden
    )
    VALUES (
        '${data.ilan_no}',
        '${data.fiyat}',
        '${data.ilan_tarihi}',
        '${data.marka}',
        '${data.seri}',
        '${data.model}',
        ${data.yil},
        ${data.kilometre},
        '${data.vites_tipi}',
        '${data.yakit_tipi}',
        '${data.kasa_tipi}',
        ${motor_hacmi},
        ${motor_gucu},
        '${data.cekis}',
        '${data.yakit_tuketimi}',
         ${yakit_deposu},
        '${data.boya_degisen}',
        '${data.takasa_uygun}',
        '${data.kimden}'
    );
    `;
    try {
        await pool.query(query);
        console.log(`succesfly added in db`)
    } catch (err) {
        console.error(err);
    }
}
module.exports = { insertCarDetails };
