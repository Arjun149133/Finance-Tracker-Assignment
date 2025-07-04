import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
const data = [{name: 'Jan', uv: 400, pv: 2400, amt: 2400}, {name: 'Feb', uv: 350, pv: 2500, amt: 2400}, {name: 'Mar', uv: 100, pv: 2600, amt: 2400}, {name: 'Apr', uv: 200, pv: 2700, amt: 2400}];

const ExampleChart = () => {
  return (
     <BarChart width={500} height={300} data={data}>
    <XAxis dataKey="name" stroke="#8884d8" />
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="uv" fill="#8884d8" barSize={30} />
  </BarChart>
  )
}

export default ExampleChart