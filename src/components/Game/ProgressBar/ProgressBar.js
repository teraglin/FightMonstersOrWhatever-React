import React from 'react'

export const ProgressBar = (props) => {
    const { bgcolor, completed, maxHealth, name } = props

    const containerStyles = {
        height: 20,
        width: `100%`,
        backgroundColor: "#fff",
        borderRadius: 3,
        // marginTop: 25,
        marginBottom: 25,
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed < 0 ? 0 : completed / maxHealth * 100}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        backgroundColor: "rgba(0,0,0,0)",
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div>
            <span style={labelStyles}>{`${name}: ${completed} | ${maxHealth}`}</span>
            <div style={containerStyles}>
                <div style={fillerStyles}>
                </div>
                
            </div>
            
        </div>
    )
}

