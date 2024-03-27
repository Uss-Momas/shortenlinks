import axios from "axios";
import { useEffect } from "react";

export default function RedirectPage() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
            window.location.href = '/';
            return;
        }

        axios.get(`http://localhost:3333/proxy/${code}`, {headers: {'Access-Control-Allow-Origin': true}})
            .then((res) => {
                window.location.href = res.data.link;
            })
            .catch((e) => {
                console.error('Error:', e);
            });
        console.log();

    });


    return (
        <div>Redirecting...</div>
    );
}