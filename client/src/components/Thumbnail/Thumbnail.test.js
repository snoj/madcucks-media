import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Thumbnail from './Thumbnail';

const episodeInfo = {
    "title": "Episode 89 - Dick on Getting Caught",
    "published": "2018-02-13T05:09:12.000Z",
    "guid": "04b1b04874583ba659541cc90290fae1",
    "link": "http://dick.show/episode-89/",
    "image": "http://static.libsyn.com/p/assets/a/e/8/9/ae89bf802d4614a7/89.png",
    "description": "<p>People who ignore \"The Zipper\", the mystery of my broken toilet, Smiley my broken handyman, \"My House\" TV has turned me into a dog, Nick Rekieta calls in with some Hot Goss about Maddox's maybe two or three time DUI lawyer \"Dog Bite\" Kevin Landau, Asterios' Cernovich sex tape, a special erotic story for Valentine's Day, Sean learns to ride a bicycle, The Skate Mate, being on The Milo Yiannopoulos show, the feminist caliphate, drunk dogs, and the nature of getting caught; all that and more this week on The Dick Show!</p>",
    "enclosure": {
        "filesize": 133572480,
        "type": "audio/mpeg",
        "url": "http://traffic.libsyn.com/thedickshow/The_Dick_Show_089.mp3?dest-id=516728"
    },
    "duration": "02:18:03"
};

describe('Thumbnail', () => {
    it('renders with episode info', () => {
        const component = shallow(
        <Thumbnail title={episodeInfo.title} 
            duration={episodeInfo.duration} 
            date={episodeInfo.duration}
            imgSrc={episodeInfo.image}
            episodeURL={episodeInfo.link}/>
        );
        const tree = toJson(component);
        expect(tree).toMatchSnapshot();
    });

    describe('convertDate function', () => {
        it('evaluates to 10 minutes ago', () => {
            const currentDate = new Date("2018-02-13T05:19:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("10 minutes ago");
        });

        it('evaluates to 1 hour ago', () => {
            const currentDate = new Date("2018-02-13T06:09:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("1 hour ago");

        });

        it('evaluates to 4 hours ago', () => {
            const currentDate = new Date("2018-02-13T09:09:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("4 hours ago");

        });

        it('evaluates to 1 day ago', () => {
            const currentDate = new Date("2018-02-14T05:09:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("1 day ago");

        });

        it('evaluates to 5 days ago', () => {
            const currentDate = new Date("2018-02-19T01:09:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("5 days ago");

        });

        it('evaluates to 1 month ago', () => {
            const currentDate = new Date("2018-03-23T01:09:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("1 month ago");

        });

        it('evaluates to 6 months ago', () => {
            const currentDate = new Date("2018-08-13T01:09:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("6 months ago");

        });

        it('evaluates to 1 year ago', () => {
            const currentDate = new Date("2019-02-13T01:09:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("1 year ago");

        });

        it('evaluates to 2 years ago', () => {
            const currentDate = new Date("2020-02-13T01:09:12.000Z");
            const publishedDate = new Date(episodeInfo.published);
            let wrapper = shallow(
                <Thumbnail title={episodeInfo.title} 
                    duration={episodeInfo.duration} 
                    date={episodeInfo.duration}
                    imgSrc={episodeInfo.image}
                    episodeURL={episodeInfo.link}/>
                );
            const result = wrapper.instance().convertDate(currentDate,publishedDate);

            expect(result).toEqual("2 years ago");

        });
    });

});

