/*


IO FORMAT

   
For example if the input values are this:

	cylinder_size = 200
	current_head_position=50
	previous_head_position=90

	request_reqay = {95,180,34,11,119,123,64,62}



Command is executed as:
./exe_file cylinder_size current_head_position previous_head_position request_reqay

which in this case is,
./cscan 200 50 90 95 180 34 11 119 123 64 62
Output:
Sequence of movement is: 50 --> 34 --> 11 --> 62 --> 64 --> 95 --> 119 --> 123 --> 180 --> 
Total seek time = 208
Average Seek time = 26.000000

*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

main(int argc, char **argv)
{
	int dir, n, r, totseek = 0, prev, cur, ct = 0, size;
	int req[10], seq[10];
	size = atoi(argv[1]);
	n = argc - 4;
	int temp, i, j;
	for (i = 4; i < argc; i++)
		req[ct++] = atoi(argv[i]);

	ct = 0;

	cur = atoi(argv[2]);
	prev = atoi(argv[3]);

	int init=cur;

	if (cur > prev)
		dir = 1; //right
	else
		dir = 0; //left

	for (i = 0; i < n - 1; i++)
		for (j = 0; j < n - 1 - i; j++)
			if (req[j] > req[j + 1])
			{
				temp = req[j];
				req[j] = req[j + 1];
				req[j + 1] = temp;
			}
	/* if (dir)//right
	{
		totseek = (cur - req[0]) + 2 * (req[n - 1] - cur);
		for (i = 0; i < n; i++)
		{
			if (req[i] < cur)
				continue;
			else
			{
				seq[ct++] = req[i];
			}
		}
		for (i = n - 1; i >= 0; i--)
		{
			if (req[i] > cur)
				continue;
			else
			{
				seq[ct++] = req[i];
			}
		}
	}
	else//left
	{
		totseek = 2 * (cur - req[0]) + (req[n - 1] - cur);

		for (i = n - 1; i >= 0; i--)
		{
			if (req[i] > cur)
				continue;
			else
			{
				seq[ct++] = req[i];
			}
		}
		for (i = 0; i < n; i++)
		{
			if (req[i] < cur)
				continue;
			else
			{
				seq[ct++] = req[i];
			}
		}
	}
 */
	if (dir == 0) {
        if (cur < req[0]) {
            for (i = 0; i < n; i++) {
                totseek += req[i] - cur;
                seq[ct++]=req[i];
                cur = req[i];
            }
        }
        else if (cur > req[n - 1]) {
            for (i = n - 1; i >= 0; i--) {
                totseek += cur - req[i];
                seq[ct++]=(req[i]);
                cur = req[i];
            }
        }
        else {
            for (i = n - 1; i >= 0; i--) {
                if (req[i] <= cur)
                    break;
            }
            //console.log(i,req[i])
            for (j = i; j >= 0; j--) {
                totseek += cur - req[j];
                seq[ct++]=(req[j]);
                cur = req[j];
            }

            if (i != n-1) {
                for (j = i + 1; j < n; j++) {
                    totseek += req[j] - cur;
                    cur = req[j];
                    seq[ct++]=(req[j]);
                }
            }
        }
    }
    else {
        if (cur < req[0]) {
            for (i = 0; i < n; i++) {
                totseek += req[i] - cur;
                seq[ct++] = (req[i]);
                cur = req[i];
            }
        }
        else if (cur > req[n - 1]) {
            for (i = n - 1; i >= 0; i--) {
                totseek += cur - req[i];
                seq[ct++] = (req[i]);
                cur = req[i];
            }
        }
        else {
            for (i = 0; i < n; i++) {
                if (req[i] >= cur)
                    break;
            }
            for ( j = i; j < n; j++) {
                totseek += req[j] - cur;
                seq[ct++] = (req[j]);
                cur = req[j];
            }

            if (i != 0) {
                for (j = i - 1; j >= 0; j--) {
                    totseek += cur - req[j];
                    cur = req[j];
                    seq[ct++] = (req[j]);
                }
            }
        }
    }

	printf("%d ",init);
	for (i = 0; i < n; i++)
		printf("%d ", seq[i]);
	printf("\n%d\n%f\n", totseek, (float)totseek / n);
}
