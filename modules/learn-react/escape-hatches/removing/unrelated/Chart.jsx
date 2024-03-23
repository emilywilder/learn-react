"use client" // don't forget this part if you use app dir to mark the whole
import { data } from "autoprefixer"
// file as client-side components

/*
    thanks to https://medium.com/@farrel.abyansyah/how-to-use-apexcharts-in-a-next-js-project-96e413bc9b31
    for providing a way to get apexcharts working in next.js
*/

import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function BarChart({ title, dataset }) {
    function getSeries(dataset) {
        return [{ data: dataset.map((a) => a.population) }]
    }

    function getCategories(dataset) {
        return dataset.map((a) => a.name)
    }
    const state = {
        series: getSeries(dataset),
        options: {
            chart: {
                type: "bar",
                height: 380,
            },
            plotOptions: {
                bar: {
                    barHeight: "100%",
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: "bottom",
                    },
                },
            },
            dataLabels: {
                enabled: true,
                textAnchor: "start",
                style: {
                    colors: ["#fff"],
                },
                formatter: function (val, opt) {
                    return (
                        opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                    )
                },
                offsetX: 0,
                dropShadow: {
                    enabled: true,
                },
            },
            stroke: {
                width: 1,
                colors: ["#fff"],
            },
            xaxis: {
                tickAmount: 4,
                categories: getCategories(dataset),
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            title: {
                text: title,
                align: "center",
                floating: true,
            },
            tooltip: {
                x: {
                    show: true,
                },
                y: {
                    title: {
                        formatter: function () {
                            return ""
                        },
                    },
                },
            },
            legend: {
                show: false,
            },
        },
    }

    return (
        <Chart
            options={state.options}
            series={state.series}
            type="bar"
            height={380}
        />
    )
}
