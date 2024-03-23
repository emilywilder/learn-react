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
        // series: [
        //     {
        //         data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        //     },
        // ],
        return [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }]
    }

    function getCategories(dataset) {
        // categories: [
        //     "South Korea",
        //     "Canada",
        //     "United Kingdom",
        //     "Netherlands",
        //     "Italy",
        //     "France",
        //     "Japan",
        //     "United States",
        //     "China",
        //     "India",
        // ],
        return [
            "South Korea",
            "Canada",
            "United Kingdom",
            "Netherlands",
            "Italy",
            "France",
            "Japan",
            "United States",
            "China",
            "India",
        ]
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
                theme: "dark",
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function () {
                            return ""
                        },
                    },
                },
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
