// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'OmniResolve-AI',
			description: 'Dokumentasi Resmi & Landing Page Autonomous Dispute Resolver Qhomemart',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/AgungDwiPangestu/OmniResolve-AI' }
			],
			sidebar: [
				{
					label: 'Pendahuluan',
					items: [
						{ label: 'Memulai Cepat', slug: 'guides/quickstart' },
					],
				},
				{
					label: 'Aturan & SOP',
					items: [
						{ label: 'Skenario Qhomemart', slug: 'scenarios-qhomemart' },
					],
				},
				{
					label: 'Referensi API & Teknis',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
			customCss: [
				// Path to your custom CSS file
			],
		}),
	],
});
