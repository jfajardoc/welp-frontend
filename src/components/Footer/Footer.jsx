import React from 'react';
import { IconContext } from "react-icons";
import {FaHeart} from 'react-icons/fa'
import './footer.scss';

export default function Footer() {
    return (
        <div className="footer">
            <p>Made with <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}><FaHeart color="#ff0000" /></IconContext.Provider> by <a href="https://johnfajardo.dev">John Fajardo</a> | GitHub </p>
        </div>
    )
}
