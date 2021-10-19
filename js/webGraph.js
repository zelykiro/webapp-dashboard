const formats = {
	dataHourly: {
		labels: [
			"10am",
			"11am",
			"12pm",
			"1pm",
			"2pm",
			"3pm",
			"4pm",
			"5pm",
			"6pm",
			"7pm",
			"8pm",
		],
		data: [22, 28, 16, 35, 21, 43, 20, 18, 35, 18, 21],
		max: 50,
	},

	dataDaily: {
		labels: [
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
		],
		data: [220, 350, 275, 390, 250, 420, 250, 250, 400, 350, 475],
		max: 500,
	},

	dataWeekly: {
		labels: [
			"16-22",
			"23-29",
			"30-5",
			"5-12",
			"13-19",
			"20-26",
			"27-3",
			"4-10",
			"11-17",
			"18-24",
			"25-31",
		],
		data: [500, 1000, 750, 1250, 1750, 1250, 1000, 1500, 2000, 1500, 2500],
		max: 2500,
	},

	dataMonthly: {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		data: [
			1950, 4000, 3500, 5150, 7000, 3750, 5000, 4000, 5250, 7550, 5000, 9500,
		],
		max: 10000,
	},
};
const webCanvas = document.getElementById("web-canvas").getContext("2d");

Chart.defaults.font.family = "Open Sans";
Chart.defaults.font.size = "11";
Chart.defaults.font.weight = "400";

const webChart = new Chart(webCanvas, {
	type: "line",

	data: {
		labels: formats.dataHourly.labels,
		datasets: [
			{
				pointBackgroundColor: "rgba(116,119,191,0.3)",
				backgroundColor: "rgba(116,119,191,0.3)",
				borderWidth: 1,
				fill: true,
				tension: 0.3,
				data: formats.dataHourly.data,
			},
		],
	},

	options: {
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				boxWidth: 10,
			},
		},
		scales: {
			y: {
				min: 0,
				max: formats.dataHourly.max,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	},
});
