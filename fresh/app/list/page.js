'use client';

import { useState } from 'react';

export default function List() {
    const 상품 = ['Tomatoes', 'Pasta', 'Coconut'];
    const [count, setCount] = useState([0,0,0]);

    const countIncrement = (index) => {
        const newCounts = [...count];
        newCounts[index] += 1;
        setCount(newCounts);
    };

    const countDecrement = (index) => {
        const newCounts = [...count];
        newCounts[index] -= 1;
        setCount(newCounts);
    };

    return (
        <div>
            <h4 className="title">상품목록</h4>

            {상품.map((a, i) => {
                return (
                    <div className="food" key={i}>
                        <img src={`/food${i}.png`} className="food-img" alt={`${a} image`}></img>
                        <h4>{a} $40</h4>
                        <span>{count[i]} </span>
                        <button
                            onClick={() => {
                                countIncrement(i);
                            }}
                        >
                            +
                        </button>
                        <button
                            onClick={() => {
                                countDecrement(i);
                            }}
                        >
                            -
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
