import React, { FC } from 'react';
import WordingConstant from '../utils/wording.json';

const Wording = WordingConstant.Loader;

const Loader: FC = () => {
    return (
        <div className={'loader'}>
            <span>
                {Wording.text}
            </span>
        </div>
    );
}

export default Loader;