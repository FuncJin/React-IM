import RecordAudio from '@components/RecordAudio'

import type { FC } from 'react'

import type { RecordedType } from './interface'

const Recorded: FC<RecordedType> = ({ voice }) => <RecordAudio {...voice} />

export default Recorded
