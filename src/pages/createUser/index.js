import React, { useEffect, useState } from 'react'
import crudServices from '../../api/crud-services';

export default function CreateUser() {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, job } = e.target.elements;
        let valid = true;
        if (name.value === "") {
            valid = false;
            setError("please enter name.");
        } else if (job.value === "") {
            valid = false;
            setError("please enter job.");
        }

        if (valid) {
            setError('');
            let param = {
                name: name.value,
                job: job.value
            }
            crudServices.createUser(param).then((res)=>{
                console.log("res",res);
            })
            .catch((err)=>{
                console.log("error",err);
            })
        }
    }
    return (
        <div style={{ flex: 1 }}>
            <form onSubmit={handleSubmit}>
                <div style={{ flexDirection: 'column', flex: 1, display: 'grid' }}>
                    <div>
                        <label >
                            Name:
                            <input type="text" name="name" />
                        </label>
                    </div>
                    <label>
                        Job:
                        <input type="text" name="job" />
                    </label>
                    <label>{error}</label>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}
