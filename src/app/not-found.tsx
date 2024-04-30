import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
	return (
		<div className="h-100vh-10 flex flex-col items-center justify-center gap-4">
			<Image
				src="/404.svg"
				height={0}
				width={0}
				alt="Not Found"
				className="w-80 h-80"
			/>
			<h1 className="text-6xl font-semibold text-zinc-600">DESCULPE</h1>
			<p className="text-xl text-zinc-600">
				Não conseguimos encontrar essa página
			</p>
			<Link className="text-emerald-700 hover:underline" href="/">
				Voltar para página inicial
			</Link>
		</div>
	);
};

export default NotFound;
