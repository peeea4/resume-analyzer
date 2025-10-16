import React, { type FC } from "react";

type Props = {
	score: number;
	suggestions: {
		type: "good" | "improve";
		tip: string;
	}[];
};

const Ats: FC<Props> = () => {
	return <div>Ats</div>;
};

export default Ats;
