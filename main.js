
const chartElement = document.getElementById("chart").getContext("2d");

const chartLabels = [];
const chartData = {
    labels: chartLabels,
    datasets: [
        {
            label: "Programming languages market share January 2021",
            backgroundColor: [],
            borderColor: "rbg(255, 255, 255)",
            borderWidth: 1,
            data: []
        }
    ]
};
const chartConfig = {
    type: "bar",
    data: chartData,
    options: {}
};

fetch("./data/top10language.json")
    .then(datasets => datasets.json())
    .then(datasets => {
        datasets = datasets.filter(
            dataset => new Date(dataset.Date).getTime() === new Date("01-01-2021").getTime()
        );
        
        if(datasets.length === 1) {
            let languages = Object.keys(datasets[0]).filter(language => language !== "Date");
            chartLabels.push(...languages);

            let dataset = datasets[0];
            let data = [];
            for(const language of languages) {
                if(dataset[language]) {
                    data.push(dataset[language]);
                } 
            }
            data = data.map(d => d * 100);

            let dataColor = data.map(
                d => `rgba(${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}`
            );

            chartData.datasets[0].data.push(...data);
            chartData.datasets[0].backgroundColor.push(...dataColor);

            const chart = new Chart(chartElement, chartConfig);
        }
    });