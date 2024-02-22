import React, { useState, useEffect } from 'react';
import '../stylesheets/faq.css';

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchFAQs = async () => {
            const response = await fetch('http://localhost:5000/faqs');
            const data = await response.json();
            setFaqs(data);
        };

        fetchFAQs();
    }, []);

    const handleSearch = () => {
        const results = faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results.map(faq => ({ ...faq, showAnswer: false })));
    };

    const toggleAnswer = index => {
        const newResults = [...searchResults];
        newResults[index].showAnswer = !newResults[index].showAnswer;
        setSearchResults(newResults);
    };

    return (
        <div className="faq-container">
            <h2>FAQs</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="results-container">
                {searchResults.map((result, index) => (
                    <div key={index} className="result-item">
                        <h3 onClick={() => toggleAnswer(index)}>{result.question}</h3>
                        {result.showAnswer && <p>{result.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
