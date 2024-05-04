function calculateDepositDetails(
  initialDeposit,
  annualRate,
  durationInMonths,
  monthlyAddition,
  capitalization
) {
  let totalAmount = initialDeposit; // Boshlang'ich summa
  let totalInvestment = initialDeposit; // Umumiy sarmoyani hisobga olamiz

  let monthlyRate = annualRate / 12 / 100; // Oylik foiz stavkasi

  for (let month = 1; month <= durationInMonths; month++) {
    if (capitalization) {
      // Kapitalizatsiya bilan oylik foiz stavkasi qo'shiladi
      totalAmount *= 1 + monthlyRate;
    }

    // Har oyda qo'shiladigan mablag'ni qo'shamiz
    totalAmount += monthlyAddition;
    totalInvestment += monthlyAddition;

    if (!capitalization) {
      // Agar kapitalizatsiya bo'lmasa, foizlar faqat boshlang'ich summa ustida hisoblanadi
      totalAmount += initialDeposit * monthlyRate;
    }
  }

  let totalInterest = totalAmount - totalInvestment; // Jami foiz daromadi

  return {
    finalAmount: totalAmount.toFixed(2),
    totalInvestment: totalInvestment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    interestRate: ((totalInterest / totalInvestment) * 100).toFixed(2), // Yillik foiz daromadi
  };
}

// Hisobotni chiqarish funksiyasi
function calculate() {
  const initialDeposit =
    parseFloat(document.getElementById("initialDeposit").value) || 0;
  const annualRate =
    parseFloat(document.getElementById("annualRate").value) || 0;
  const durationInMonths =
    parseInt(document.getElementById("durationInMonths").value) || 0;
  const monthlyAddition =
    parseFloat(document.getElementById("monthlyAddition").value) || 0;
  const capitalization =
    document.getElementById("capitalization").value === "true";

  const results = calculateDepositDetails(
    initialDeposit,
    annualRate,
    durationInMonths,
    monthlyAddition,
    capitalization
  );

  document.getElementById("finalAmount").textContent =
    "so'm" + results.finalAmount;
  document.getElementById("totalInvestment").textContent =
    "so'm" + results.totalInvestment;
  document.getElementById("totalInterest").textContent =
    "so'm" + results.totalInterest;
  document.getElementById("interestRate").textContent =
    results.interestRate + "%";
}
