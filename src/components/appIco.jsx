
export function Application({ icon, clicked, appName }) {
    return (
        <div>
            <div className="app-icon" onClick={clicked}>
                <img src={icon} className="icon-img"></img>
            </div>
            <div className="app-name">{appName}</div>
        </div>
    )
}