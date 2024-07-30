import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import './forecast.css'

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const Forecast = ({ data }) => {
    console.log(data.list);
    const dayInWeek = new Date().getDay();
    const forecastdays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInWeek));
    console.log(forecastdays);
    return (
        <>
            <label className='title'>Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className='daily-item'>
                                    <img alt='weather' className='icon-small' src={`icons/${item.weather[0].icon}.png`} />
                                    <label className='day'>{forecastdays[idx]}</label>
                                    <label className='desc'>{item.weather[0].description}</label>
                                    <label className='min-max'>{Math.round(item.main.temp_min)}&deg;C / {Math.round(item.main.temp_max)}&deg;C </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className='daily-details-grid'>
                                <div className='daily-details-grid-item>'>
                                    <label>Pressure</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className='daily-details-grid-item>'>
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className='daily-details-grid-item>'>
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}</label>
                                </div>
                                <div className='daily-details-grid-item>'>
                                    <label>Wind Speed</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className='daily-details-grid-item>'>
                                    <label>Sea-Level</label>
                                    <label>{item.main.sea_level} m</label>
                                </div>
                                <div className='daily-details-grid-item>'>
                                    <label>Feels Like</label>
                                    <label>{item.main.feels_like}&deg;C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}
export default Forecast;