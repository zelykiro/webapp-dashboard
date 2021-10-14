const dailyCanvas = document.getElementById("daily-canvas").getContext("2d");
const dailyChart = new Chart(dailyCanvas, {
	type: "bar",

	data: {
		labels: ["S", "M", "T", "W", "T", "F", "S"],
		datasets: [
			{
				data: [75, 110, 175, 125, 220, 200, 100],
				backgroundColor: "#7477bf",
				fill: true,
			},
		],
	},

	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	},
});