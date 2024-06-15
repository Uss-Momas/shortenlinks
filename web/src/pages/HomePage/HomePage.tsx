import { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import './HomePage.css';
import axios from 'axios';


interface ShortLink {
    id: string,
    code: string,
    originalUrl: string,
    createdAt: string,
    updatedAt: string
}

async function fetchLinks(): Promise<ShortLink[]> {
    const response = await axios.get<ShortLink[]>('http://localhost:3333/api/links');
    return response.data;
}

export default function HomePage() {
    const [shortLinks, setShortLinks] = useState<ShortLink[]>([]);
    const [inputLink, setInputLink] = useState('');
    const [inputCode, setInputCode] = useState('');

    useEffect(() => {
        fetchLinks().then((shortLinks) => {
            setShortLinks(shortLinks);
        }).catch(() => {
            console.log('ERROR');
        });
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLink(e.target.value);
    }

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputCode(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('Want to send what is in INPUT: ', inputLink);
        e.preventDefault();

        const response = await axios.post('http://localhost:3333/api/links', {
            code: inputCode,
            url: inputLink,
        });
        console.log(response);
    }

    return (
        <>
            <header>
                <img src={logo} alt="Logo" />
            </header>
            <main className='main-content'>
                <div className='short-link-content'>
                    <h1 className='short-link-title'>Shorten Your Loooong Links :)</h1>
                    <p className='short-link-description'>shortly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
                    <div className='short-link-form-container'>
                        <form action="" className='short-link-form' onSubmit={handleSubmit}>
                            <input type="text" placeholder="Enter the link here" value={inputLink} onChange={handleOnChange} required />
                            <input type="text" placeholder='Enter the code here' value={inputCode} onChange={handleCodeChange} required />
                            <input type="submit" value="Shorten Now!" />
                        </form>
                    </div>
                </div>
                <div>
                    <table className='short-link-table'>
                        <thead>
                            <tr>
                                <th>Short Link</th>
                                <th>Original Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>https://shortly.com/Bn41aCOlnxj</td>
                                <td>https://www.twitter.com/tweets/8erelCoihu/</td>
                            </tr>
                            <tr>
                                <td>https://shortly.com/Bn41aCOlnxj</td>
                                <td>https://www.twitter.com/tweets/8erelCoihu/</td>
                            </tr>
                            <tr>
                                <td>https://shortly.com/Bn41aCOlnxj</td>
                                <td>https://www.twitter.com/tweets/8erelCoihu/</td>
                            </tr>
                            <tr>
                                <td>https://shortly.com/Bn41aCOlnxj</td>
                                <td>https://www.twitter.com/tweets/8erelCoihu/</td>
                            </tr>
                            <tr>
                                <td>https://shortly.com/Bn41aCOlnxj</td>
                                <td>https://www.twitter.com/tweets/8erelCoihu/</td>
                            </tr>
                            <tr>
                                <td>https://shortly.com/Bn41aCOlnxj</td>
                                <td>https://www.twitter.com/tweets/8erelCoihu/</td>
                            </tr>
                            {
                                shortLinks.map((shortLink) => (<tr key={shortLink.id}>
                                    <td><a href={`http://localhost:5173/redirect?code=${shortLink.code}`} target="_blank" rel="noopener noreferrer">http://localhost:5173/{shortLink.code}</a></td>
                                    <td>{shortLink.originalUrl}</td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}