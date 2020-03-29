import { useEffect, useState } from 'react';

import { prependRequest } from '../../lib/constants';

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

export default (url) => {
  const [blob, setBlob] = useState('');

  useEffect(() => {
    toDataURL(`${prependRequest}${url}`).then(img => setBlob(img))
  }, []);

  return blob;
}
