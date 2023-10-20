type Props = {
    theme: string;
};

export default function BackGround({theme}: Props) {
    return (
        <div
            className={`mainTailwind ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-radial-gradient'
            }`}
        >
            <div className="gridBackground" />
            <div className="gradient" />
        </div>
    );
}
