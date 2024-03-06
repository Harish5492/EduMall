import React from 'react';
import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import { Details } from 'app/views/ApiBackend/ApiBackend';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const DoughnutChart = ({ height, color = [] }) => {
  const theme = useTheme();
  const token = useSelector((state) => state.authToken);
  const [details, setDetails] = useState({});
  const Detailsfetch = async () => {
    const response = await Details(token);

    setDetails(response.data);


  }
  useEffect(() => {

    Detailsfetch();
  }, [])

  const option = {
    legend: {
      show: true,
      itemGap: 8,
      icon: 'circle',
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: 'roboto'
      }
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    xAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],

    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto'
            },
            formatter: '{a}'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal'
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: '{b} \n{c} ({d}%)'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: `${details.totalUserCount}`,
            name: 'Total Users'
          },
          {
            value: `${details.userCount}`,
            name: 'Active Users'
          },
          {
            value: `${details.subadminCount}`,
            name: 'Sub Admin'
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color]
      }}
    />
  );
};

export default DoughnutChart;
