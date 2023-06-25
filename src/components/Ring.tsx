import { RingProgress } from '@ant-design/plots';

interface Props {
    height: number;
    width: number;
    autoFit: bool;
    percent: number;
    color: color;
}

const Ring: React.FC<Props> = ({
    height,
    width,
    autoFit,
    percent,
    color
}: Props) => {
    const config = {
        height: height,
        width: width,
        autoFit: autoFit,
        percent: percent,
        color: [color, '#E8EDF3']
    };
    return <RingProgress {...config} />;
};

export default Ring;
