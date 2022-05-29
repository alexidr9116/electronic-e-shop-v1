import PropTypes from 'prop-types';
import React, { useState } from 'react';

DropdownMenu.propTypes = {
    items: PropTypes.array,
    header: PropTypes.node,
    direction: PropTypes.string,
    contentClass: PropTypes.string,
}
export default function DropdownMenu({ direction = '', header, items = [], contentClass }) {
    return (
        <div className={`dropdown ${direction}`}>
            {header}
            {items && items.length > 0 &&
                <ul tabIndex="0" className={`dropdown-content menu p-2 shadow bg-base-300 rounded-md w-52 ${contentClass}`}>
                    {items.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                {item}
                            </React.Fragment>
                        )
                    })}
                </ul>
            }
        </div >
    )
}