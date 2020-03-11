import React from 'react';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import './slider.css';
import EventItem from './EventItem';

const settings = {
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  useTransform: false,
  draggable: false,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        draggable: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        draggable: true,
        arrows: false,
      },
    },
  ],
};

const EventSlider = React.memo(
  ({ ticketItems, category, onSelectTicket, selectTicket }) => {
    return (
      <Slider {...settings}>
        {ticketItems &&
          ticketItems.map(ticket => (
            <EventItem
              key={uuidv4()}
              category={category}
              ticket={ticket}
              onSelectTicket={onSelectTicket}
              selectTicket={selectTicket}
            />
          ))}
      </Slider>
    );
  },
);

export default EventSlider;
