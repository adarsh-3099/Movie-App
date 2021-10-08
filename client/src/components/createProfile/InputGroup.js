import React from 'react'
import classnames from 'classnames'

function InputGroup({ name, placeholder, value, error, onChange, icon, type }) {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepand">
            </div>
            <input value={value} onChange={onChange} type={type}
            className={classnames("form-control form-control-lg",{'is-invalid': error})}
             placeholder={placeholder} name={name} />
            { error && (<div className="invalid-feedback">{error}</ div>) }
        </div>
                        
    )
}

export default InputGroup;
