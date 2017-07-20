<template>
	<div class="star">
		<span v-for = 'itemClass in itemList' class="star-list" :class = "itemClass"></span>
	</div>
</template>

<script>
	const length = 5 ;
	const STAR_ON = 'on';
	const STAR_HALF = 'half';
	const STAR_ZERO = 'off';

	export default{
		props:['score'],
		computed : {
			itemList(){
				let result = [];
				let integer = Math.floor(this.score);
				let litter = this.score - integer;
				for( let i = 0 ; i < integer ; i++ ){
					result.push( STAR_ON );
				};
				if( litter > 0.5 ) {
					result.push( STAR_HALF );
				};
				while( result.length < length ){
					result.push( STAR_ZERO );
				}
				return result;
			}
		}

	}
</script>

<style lang = 'less' scoped>
	.star{
		.star-list{
			width: 0.4rem;
			height: 0.4rem;
			display:inline-block;
			margin-left: 0.1rem;
			&.on{
				background-image: url('star_on.png');
				background-size:0.4rem 0.4rem;
				background-repeat: no-repeat;
			}
			&.half{
				background-image: url('star_half.png');
				background-size:0.4rem 0.4rem;
				background-repeat: no-repeat;
			}
			&.off{
				background-image: url('star_off.png');
				background-size:0.4rem 0.4rem;
				background-repeat: no-repeat;
			}
		}


	}
</style>