const mobileCanvas = document.getElementById("mobile-canvas").getContext("2d");

const mobileChart = new Chart(mobileCanvas, {
	type: "doughnut",

	data: {
		labels: ["Desktop", "Tablet", "Phones"],
		datasets: [
			{
				data: [70, 15, 15],
				backgroundColor: ["#7477bf", "#81c98f", "#51b6c8"],
				borderWidth: 0,
			},
		],
	},

	options: {
		plugins: {
			legend: {
				position: "right",
				labels: {
					font: {
						family: "Open Sans",
						size: 12,
						weight: 600,
					},
					boxWidth: 20,
				},
			},
			tooltip: {
				boxWidth: 10,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	},
});
