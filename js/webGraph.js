const dataHourly = {
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
};

const dataDaily = {
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
	data: [220, 350, 300, 175, 250, 450, 300, 250, 400, 350, 200],
	max: 500,
};

const dataWeekly = {
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
	data: [500, 1000, 750, 1250, 1750, 1250, 1000, 1500, 2000, 1500, 2000],
	max: 2500,
};

const dataMonthly = {
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
		1950, 4000, 3500, 5150, 7000, 3750, 1950, 4000, 5250, 7550, 4500, 8000,
	],
	max: 10000,
};

const webCanvas = document.getElementById("web-canvas").getContext("2d");

Chart.defaults.font.family = "Lato";
Chart.defaults.font.size = "11";
Chart.defaults.font.weight = "400";

const webChart = new Chart(webCanvas, {
	type: "line",

	data: {
		labels: dataMonthly.labels,
		datasets: [
			{
				pointBackgroundColor: "rgba(116,119,191,0.3)",
				backgroundColor: "rgba(116,119,191,0.3)",
				borderWidth: 1,
				fill: true,
				data: dataMonthly.data,
			},
		],
	},

	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				min: 0,
				max: dataMonthly.max,
			},
		},
		responsive: true,
		webtainAspectRatio: false,
	},
});
