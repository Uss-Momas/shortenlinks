import logo from '../../assets/logo.svg';
import './HomePage.css';

export default function HomePage() {
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
                        <form action="" className='short-link-form'>
                            <input type="text" placeholder="Enter the link here" />
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
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}