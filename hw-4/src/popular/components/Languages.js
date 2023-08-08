import {memo} from "react";
import {Tab, Tabs} from "@mui/material";

const Languages = memo(({languages, selectedLanguage, onChange}) => {
    console.log('render languages');
    return <Tabs value={selectedLanguage} onChange={onChange} centered>
        {languages.map((language) => <Tab key={language} label={language} value={language}/>)}
    </Tabs>
});

export default Languages;