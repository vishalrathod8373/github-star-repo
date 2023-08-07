import { Accordion, AccordionDetails, AccordionSummary, Box, MenuItem, Select, Stack, Typography } from '@mui/material'
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const AccordionComponent = (props) => {
    
    const [expanded, setExpanded] = React.useState({ open: false, owner: '', repo: '' });
    const [age, setAge] = React.useState('');
    const dispatch = useDispatch();
    const stateData = useSelector((state) => state.codeFreq);
   
    const handleChange =
        ({ panel, owner, repo }) => (event, isExpanded) => {

            setExpanded((prevState) => ({ open: isExpanded ? panel : false, owner: owner, repo: repo }));
        };

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const options = {
        chart: {
            type: 'spline',
        },
        title: {
            text: 'Spline Chart with Plot Bands',
        },
        xAxis: {
            categories: stateData.accordionData?.map(entry => {
                const date = new Date(entry.week * 1000);
                const formattedDate = date.toLocaleDateString();
                return `${formattedDate}`;
            }),
            labels: {
                formatter: function () {
                    const date = new Date(this.value);
                    return date.toLocaleDateString();
                },
            },
            plotBands: stateData.accordionData?.map(entry => ({
                color: entry.days.includes(0) ? 'rgba(68, 170, 213, 0.2)' : 'transparent',
                from: entry.week * 1000 - 0.5,
                to: entry.week * 1000 + 0.5,
            })),
        },
        yAxis: {
            title: {
                text: 'Value',
            },
        },
        series: dayNames.map(dayName => ({
            name: dayName,
            data: stateData.accordionData?.map(entry => entry.days[dayNames.indexOf(dayName)]),
        })),
    };

    const selectHandleChange = (event) => {
        setAge(event.target.value);
        const actionMap = {
            commits: 'GET_COMMIT',
            addition: 'GET_CONTRIBUTORS',
            deletions: 'GET_CODE_FREQ'
        };
        const payload = { owner: expanded.owner, repo: expanded.repo };
        const actionType = actionMap[event.target.value];
        if (actionType) {
            dispatch({ type: actionType, payload: payload });
        }
    };
   
    return (
        <Accordion expanded={expanded.open === props?.item?.id} onChange={handleChange({ panel: props?.item?.id, owner: props?.item?.owner?.login, repo: props?.item?.name })}>
            <AccordionSummary
                expandIcon={expanded.open !== false ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Stack
                    direction="row"

                    alignItems="center"
                    spacing={10}
                    px={5}
                >
                    <img
                        src={`${props?.item?.owner?.avatar_url}?w=50&h=50&fit=crop&auto=format`}
                        srcSet={`${props?.item?.owner?.avatar_url}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                        alt={props?.item?.name}
                        loading="lazy"
                        width={90}
                        height={90}
                    />
                    <Stack>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {props?.item?.name}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{props?.item?.description}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>star : {props?.item?.stargazers_count}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Issues : {props?.item?.open_issues}</Typography>
                    </Stack>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Box >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}

                        displayEmpty
                        onChange={selectHandleChange}
                    >
                        <MenuItem disabled value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value={'commits'}>Commits</MenuItem>
                        <MenuItem value={'addition'}>Addition</MenuItem>
                        <MenuItem value={'deletions'}>Deletions</MenuItem>
                    </Select>
                </Box>
                {expanded.open !== false && <HighchartsReact highcharts={Highcharts} options={options} />}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionComponent