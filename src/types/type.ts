export interface post{
    id: number,
    image: string,
    date: string,
    read_time: number,
    comments: object[],
    title: string,
    short_description: string,
    description: string,
    tags: {id:number, text: string}[]
  }