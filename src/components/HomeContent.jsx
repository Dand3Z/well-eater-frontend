import classes from './HomeContent.module.css';

function HomeContent({ heading, children }) {
    return (
        <div className={classes.content}>
            <h1>{heading}</h1>
            {children}
        </div>
    )
}

export default HomeContent;