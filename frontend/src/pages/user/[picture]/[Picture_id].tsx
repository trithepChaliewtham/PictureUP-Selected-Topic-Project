import { useRouter } from 'next/router';

const Picture_id = () =>{
	const router = useRouter();
	console.log(router.query)
	return (
		<h1>
			This is picture { router.query.Picture_id } of User 
		</h1>
	)
}

export default Picture_id;