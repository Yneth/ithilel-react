import {memo, useState} from "react";
import {Tab, Tabs} from "@mui/material";
import {Link} from "react-router-dom";

const NAV_LINKS = [
    {label: 'Home', href: '/'},
    {label: 'Popular', href: '/popular'},
    {label: 'Battle', href: '/battle'},
];

const Nav = memo(() => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const onTabSelect = (tabIndex) => {
        setSelectedTabIndex(tabIndex);
    }

    return <Tabs component='nav' value={selectedTabIndex} aria-label="nav tabs example">
        {NAV_LINKS.map((link, index) =>
            <Tab key={index} label={link.label} component={Link} onClick={() => onTabSelect(index)} to={link.href}/>)}
    </Tabs>

});

export default Nav;