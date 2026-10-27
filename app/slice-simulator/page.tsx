/**
 * Render isolated slices for Prismic's live editor previews.
 */
import { SliceSimulator, getSlices, type SliceSimulatorParams } from '@prismicio/next';
import { SliceZone } from '@prismicio/react';

import { components } from '../../slices';

/**
 * Decode the simulator state and render the matching local slice components.
 * @param props - Next.js search parameters containing the simulator state.
 * @returns The Prismic slice simulator.
 */
export default async function SliceSimulatorPage({
  searchParams: search_params
}: SliceSimulatorParams) {
  const { state } = await search_params;
  const slices = getSlices(state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
