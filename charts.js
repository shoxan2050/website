let chartInstance = null;

/**
 * Statistikani diagrammada ko‘rsatadi
 * @param {number} correct - to‘g‘ri javoblar
 * @param {number} total - jami savollar
 */
function renderStatsChart(correct, total) {
  const wrong = total - correct;

  const ctx = document.getElementById("statsChart");
  if (!ctx) return;

  // Oldingi chart bo‘lsa o‘chiramiz
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["To‘g‘ri", "Xato"],
      datasets: [{
        data: [correct, wrong],
        backgroundColor: [
          "#22c55e", // yashil
          "#ef4444"  // qizil
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#e5e7eb",
            font: {
              size: 16
            }
          }
        }
      }
    }
  });
}
