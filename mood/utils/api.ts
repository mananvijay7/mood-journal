const createURL = (path) => {
      return window.location.origin + path;
}

export const createNewEntry = async () => {
      const res = await fetch(
            new Request(createURL('/api/journal'),{
                  method: 'POST',
            })
      );
      if(res.ok){
            const data = await res.json();
            return data.data;
      }
}