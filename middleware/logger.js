const log = (req, res, next) => {
  console.log(new Date().toLocaleDateString(), '=>', req.method, req.originalUrl);
  //   tidak perllu panggil res, klo di panggil akan berhenti
  //   fungsi next = untuk menjalankan fungsi berikutnya
  next();
};
// 22/10/2023 => POST /product tampilan logger di console
module.exports = log;
