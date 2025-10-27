import { Chart } from 'primereact/chart';

type CrescimentoData = {
    anoValido: string | string;
    populacao: string;
};

interface GraficoCrescimentoProps {
    dados: CrescimentoData[];
    titulo?: string;
    cor?: string;
}

export default function GraficoCrescimento({
    dados,
    titulo = 'Crescimento Populacional',
    cor = '#42A5F5',
}: GraficoCrescimentoProps) {
    const chartData = {
        labels: dados.map((item) => item.anoValido),
        datasets: [
            {
                label: 'População',
                data: dados.map((item) => item.populacao),
                fill: false,
                borderColor: cor,
                tension: 0.4,
                pointBackgroundColor: cor,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#495057',
                },
            },
            title: {
                display: true,
                text: titulo,
                color: '#495057',
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057',
                },
                grid: {
                    color: '#ebedef',
                },
            },
            y: {
                ticks: {
                    color: '#495057',
                    callback: function (value: number) {
                        return value.toLocaleString();
                    },
                },
                grid: {
                    color: '#ebedef',
                },
            },
        },
    };

    return <Chart type="line" data={chartData} options={chartOptions} />;
}
